import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Code, 
  Heading1, 
  Heading2, 
  List, 
  ListOrdered,
  Highlighter,
  Plus,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface NotePage {
  id: string;
  title: string;
  content: string;
}

export const TiptapEditor = () => {
  const [pages, setPages] = useState<NotePage[]>([]);
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);

  useEffect(() => {
    const savedPages = localStorage.getItem("notes-pages");
    if (savedPages) {
      const parsed = JSON.parse(savedPages);
      setPages(parsed);
      if (parsed.length > 0) {
        setCurrentPageId(parsed[0].id);
      }
    } else {
      // Create initial page
      const initialPage: NotePage = {
        id: Date.now().toString(),
        title: "Untitled",
        content: "",
      };
      setPages([initialPage]);
      setCurrentPageId(initialPage.id);
    }
  }, []);

  const currentPage = pages.find((p) => p.id === currentPageId);

  const editor = useEditor({
    extensions: [StarterKit, Highlight],
    content: currentPage?.content || "",
    onUpdate: ({ editor }) => {
      if (currentPageId) {
        const updatedPages = pages.map((p) =>
          p.id === currentPageId ? { ...p, content: editor.getHTML() } : p
        );
        setPages(updatedPages);
        localStorage.setItem("notes-pages", JSON.stringify(updatedPages));
      }
    },
  });

  useEffect(() => {
    if (editor && currentPage) {
      editor.commands.setContent(currentPage.content);
    }
  }, [currentPageId, editor]);

  const addNewPage = () => {
    const newPage: NotePage = {
      id: Date.now().toString(),
      title: "Untitled",
      content: "",
    };
    const updatedPages = [...pages, newPage];
    setPages(updatedPages);
    setCurrentPageId(newPage.id);
    localStorage.setItem("notes-pages", JSON.stringify(updatedPages));
  };

  const deletePage = (id: string) => {
    const updatedPages = pages.filter((p) => p.id !== id);
    setPages(updatedPages);
    if (currentPageId === id && updatedPages.length > 0) {
      setCurrentPageId(updatedPages[0].id);
    }
    localStorage.setItem("notes-pages", JSON.stringify(updatedPages));
  };

  const updatePageTitle = (id: string, title: string) => {
    const updatedPages = pages.map((p) =>
      p.id === id ? { ...p, title } : p
    );
    setPages(updatedPages);
    localStorage.setItem("notes-pages", JSON.stringify(updatedPages));
  };

  if (!editor) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-panel-border px-4 py-3">
        <div className="flex items-center gap-2 mb-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-foreground hover:bg-muted">
                {editingTitle === currentPageId ? (
                  <Input
                    value={currentPage?.title}
                    onChange={(e) =>
                      currentPageId && updatePageTitle(currentPageId, e.target.value)
                    }
                    onBlur={() => setEditingTitle(null)}
                    onKeyDown={(e) => e.key === "Enter" && setEditingTitle(null)}
                    className="h-6 text-sm"
                    autoFocus
                  />
                ) : (
                  <>
                    <span className="text-sm font-medium">{currentPage?.title}</span>
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {pages.map((page) => (
                <DropdownMenuItem
                  key={page.id}
                  onClick={() => setCurrentPageId(page.id)}
                  className="justify-between"
                >
                  <span>{page.title}</span>
                  {pages.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePage(page.id);
                      }}
                      className="text-destructive hover:text-destructive/80"
                    >
                      ×
                    </button>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            onClick={addNewPage}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-muted" : ""}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-muted" : ""}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "bg-muted" : ""}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive("highlight") ? "bg-muted" : ""}
          >
            <Highlighter className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-muted" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-muted" : ""}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "bg-muted" : ""}
          >
            <Code className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <EditorContent 
        editor={editor} 
        className="flex-1 overflow-auto p-4 prose prose-invert max-w-none"
      />
    </div>
  );
};
