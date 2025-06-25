"use client";
import { useEffect, useState } from "react";
import { CustomInput } from "../components/CustomInput";
import { ButtonTxt } from "../components/ButtonTxt";
import { MainCardInfo } from "../components/MainCardInfo";
import { useRouter } from "next/navigation";
import { BookViewCatalog, BookCard } from "../components/cardBook";
import { useAuth } from "@/app/context/AuthContext";

function BookEditor() {
  const [formData, setFormData] = useState({
    cover: null,
    textFile: null,
    isbn: "",
    department: "",
    annotation: "",
    content: "",
    citationLink: "",
    title: "",
    publicationType: "",
    edition: "",
    authors: "",
    publisher: "",
    publicationYear: "",
    pages: "",
    bbc: "",
    udc: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Здесь будет логика отправки данных
  };

  const handleSaveDraft = () => {
    console.log("Draft saved:", formData);
    // Логика сохранения черновика
  };

  return (
    <div className=" mx-auto p-6 ">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Левая колонка */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Обложка издания <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  name="cover"
                  onChange={handleChange}
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Текст книги (PDF) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="textFile"
                onChange={handleChange}
                accept=".pdf"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                ISBN <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Кафедра</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Аннотация <span className="text-red-500">*</span>
              </label>
              <textarea
                name="annotation"
                value={formData.annotation}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Содержание <span className="text-red-500">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Правая колонка */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Ссылка для цитирования
              </label>
              <input
                type="text"
                name="citationLink"
                value={formData.citationLink}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Название (заглавие) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Вид издания
              </label>
              <input
                type="text"
                name="publicationType"
                value={formData.publicationType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Издание</label>
              <input
                type="text"
                name="edition"
                value={formData.edition}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Автор(ы) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="authors"
                value={formData.authors}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Издательство <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Год выхода издания <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="publicationYear"
                value={formData.publicationYear}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Страниц <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pages"
                value={formData.pages}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ББК</label>
              <input
                type="text"
                name="bbc"
                value={formData.bbc}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">УДК</label>
              <input
                type="text"
                name="udc"
                value={formData.udc}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          {/*   <ButtonTxt
            type="button"
            onClick={handleSaveDraft}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Отклонить
          </ButtonTxt>
          <ButtonTxt
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Опубликовать
          </ButtonTxt>
       */}
        </div>
      </form>
    </div>
  );
}
const BookReviewScreen = ({
  book,
  onBack,
  onApprove,
  onReject,
  onUnpublish,
}) => {
  const [messages, setMessages] = useState([]);
  const { user, loading } = useAuth();
  const [decisionComment, setDecisionComment] = useState("");
  const [activeTab, setActiveTab] = useState("discussion");

  useEffect(() => {
    const books =
      book.title == "empty"
        ? []
        : [
            {
              id: 1,
              author: "Издатель",
              avatar: "ИЗ",
              text: "Пожалуйста, проверьте эту книгу на соответствие требованиям",
              date: "2023-05-15 14:30",
              isSystem: false,
            },
            {
              id: 2,
              author: "Система",
              avatar: "S",
              text: "Заявка отправлена на проверку",
              date: "2023-05-15 14:31",
              isSystem: true,
            },
            {
              id: 3,
              author: "Библиотекарь",
              avatar: "Б",
              text: "Я начал проверку, скоро дам ответ",
              date: "2023-05-16 10:15",
              isSystem: false,
            },
          ];
    setMessages(books);
    if (user.role == "PUBLISHER" && book.title == "empty")
      setActiveTab("application");
  }, [book.title]);

  const handleSendMessage = () => {
    if (decisionComment.trim()) {
      const newMsg = {
        id: messages.length + 1,
        author: "Библиотекарь",
        avatar: "Б",
        text: decisionComment,
        date: new Date().toLocaleString(),
        isSystem: false,
      };
      setMessages([...messages, newMsg]);
      setDecisionComment("");
    }
  };

  const handleApproveWithComment = () => {
    if (decisionComment.trim()) {
      const commentMsg = {
        id: messages.length + 1,
        author: "Библиотекарь",
        avatar: "Б",
        text: `Опубликовано с комментарием: ${decisionComment}`,
        date: new Date().toLocaleString(),
        isSystem: false,
      };
      setMessages([...messages, commentMsg]);
    }
    onApprove(decisionComment);
  };

  const handleRejectWithComment = () => {
    if (decisionComment.trim()) {
      const commentMsg = {
        id: messages.length + 1,
        author: "Библиотекарь",
        avatar: "Б",
        text: `Отклонено с комментарием: ${decisionComment}`,
        date: new Date().toLocaleString(),
        isSystem: false,
      };
      setMessages([...messages, commentMsg]);
    }
    onReject(decisionComment);
  };

  return (
    <div className="mx-auto p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Заявка: №{book.id}</h1>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-2"
        >
          ← Назад к списку
        </button>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("discussion")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "discussion"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Обсуждение
          </button>
          <button
            onClick={() => setActiveTab("application")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "application"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Заявка
          </button>
        </nav>
      </div>

      {/* Основной контент */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {/* Обсуждение */}
        <div className="p-4 border-b border-gray-200">
          {activeTab === "discussion" && (
            <>
              <h2 className="text-lg font-semibold mb-4">Обсуждение заявки</h2>

              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.isSystem ? "opacity-75" : ""
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                        message.isSystem
                          ? "bg-gray-200"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {message.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <span className="font-medium">{message.author}</span>
                        <span className="text-sm text-gray-500">
                          {message.date}
                        </span>
                      </div>
                      <p
                        className={`mt-1 ${
                          message.isSystem ? "text-gray-600 italic" : ""
                        }`}
                      >
                        {message.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "application" && <BookEditor book={book} />}
        </div>

        {/* Блок принятия решения */}
        <div className="p-4 bg-gray-50">
          <h2 className="text-lg font-semibold mb-3">Решение по заявке</h2>
          {user.role == "PUBLISHER" ? (
            <>
              <textarea
                value={decisionComment}
                onChange={(e) => setDecisionComment(e.target.value)}
                placeholder="Оставьте комментарий к решению..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-3"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleApproveWithComment}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm"
                >
                  Создать заявку
                </button>
              </div>
            </>
          ) : book.status === "опубликовано" ? (
            <div className="flex justify-end">
              <button
                onClick={() => onUnpublish("Снято с публикации")}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Снять с публикации
              </button>
            </div>
          ) : (
            <>
              <textarea
                value={decisionComment}
                onChange={(e) => setDecisionComment(e.target.value)}
                placeholder="Оставьте комментарий к решению..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-3"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleRejectWithComment}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                >
                  Отклонить
                </button>
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                >
                  Комментировать
                </button>
                <button
                  onClick={handleApproveWithComment}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm"
                >
                  Опубликовать
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const SubContentBook = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [reviewBook, setReviewBook] = useState(null);
  const { user, loading } = useAuth();
  const books = [
    {
      id: 0,
      title: "Книга1",
      author: "Пелевин Виктор",
      status: "ожидает",
      cover: "/images/emptycover.jpg",
      submissionDate: "2023-05-10",
    },
    {
      id: 1,
      title: "Типо длинное название...",
      author: "Пелевин Виктор",
      status: "опубликовано",
      cover: "/images/emptycover.jpg",
      submissionDate: "2023-05-10",
    },
    {
      id: 2,
      title: "Книга3",
      author: "Пелевин Виктор",
      status: "отклонено",
      cover: "/images/emptycover.jpg",
      submissionDate: "2023-05-10",
    },
    {
      id: 3,
      title: "Книга4",
      author: "Пелевин Виктор",
      status: "ожидает",
      cover: "/images/emptycover.jpg",
      submissionDate: "2023-05-10",
    },
    {
      id: 4,
      title: "Книга5",
      author: "Пелевин Виктор",
      status: "ожидает",
      cover: "/images/emptycover.jpg",
      submissionDate: "2023-05-10",
    },
    {
      id: 5,
      title: "Книга6",
      author: "Пелевин Виктор",
      status: "ожидает",
      cover: "/images/emptycover.jpg",
      submissionDate: "2023-05-10",
    },
  ];

  const statusOptions = [
    { value: "", label: "Все статусы" },
    { value: "ожидает", label: "Ожидает" },
    { value: "отклонено", label: "Отклонено" },
    { value: "опубликовано", label: "Опубликовано" },
  ];
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? book.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });
  const handleStartReview = (book) => {
    setReviewBook(book);
  };
  const handleBackToList = () => {
    setSelectedBook(null);
  };
  const handleApprove = (comment) => {
    // Обновляем статус книги на "опубликовано"
    const updatedBooks = books.map((b) =>
      b.id === reviewBook.id ? { ...b, status: "опубликовано" } : b
    );
    setBooks(updatedBooks);
    setReviewBook(null);
    // Здесь можно добавить API вызов
  };

  const handleReject = (comment) => {
    // Обновляем статус книги на "отклонено"
    const updatedBooks = books.map((b) =>
      b.id === reviewBook.id ? { ...b, status: "отклонено" } : b
    );
    setBooks(updatedBooks);
    setReviewBook(null);
  };

  const handleUnpublish = (comment) => {
    // Обновляем статус книги на "ожидает"
    const updatedBooks = books.map((b) =>
      b.id === reviewBook.id ? { ...b, status: "ожидает" } : b
    );
    setBooks(updatedBooks);
    setReviewBook(null);
  };

  if (selectedBook) {
    return <BookEditor />;
  }

  if (reviewBook) {
    return (
      <BookReviewScreen
        book={reviewBook}
        onBack={() => setReviewBook(null)}
        onApprove={handleApprove}
        onReject={handleReject}
        onUnpublish={handleUnpublish}
      />
    );
  }

  return (
    <div>
      <div className="flex flex-row gap-2.5 mb-4">
        <CustomInput
          title="Поиск"
          classNameAllBlock="w-[70%]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="w-[30%]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Статус
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {user.role == "PUBLISHER" ? (
        <button
          onClick={() => handleStartReview({ title: "empty" })}
          className="self-start px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Добавить книгу
        </button>
      ) : (
        <></>
      )}
      <div className="p-6">
        <div className="flex flex-wrap min-w-[200px]">
          {filteredBooks.map((book, index) => (
            <BookCard
              key={book.title + book.id + index}
              id={book.title}
              title={book.title}
              author={book.author}
              status={book.status}
              imgPath={book.cover}
              onClick={() => handleStartReview(book)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubContentBook;
