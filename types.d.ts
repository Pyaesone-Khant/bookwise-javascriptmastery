interface Book {
    title: string;
    author: string;
    id: string;
    genre: string;
    rating: number;
    totalCopies: number;
    availableCopies: number;
    description: string;
    coverColor: string;
    coverUrl: string;
    videoUrl: string;
    summary: string;
    isLoanedBook?: boolean;
    createdAt: Date | null;
}

interface AuthCredentials {
    fullName: string;
    email: string;
    password: string;
    universityId: number;
    universityCard: string
}

interface BookParams {
    title: string;
    author: string;
    genre: string;
    rating: number;
    coverUrl: string;
    videoUrl: string;
    summary: string;
    description: string;
    totalCopies: number;
    coverColor: string;
}

interface BorrowBookParams {
    bookId: string;
    userId: string;
}

interface ReturnBookParams extends BorrowBookParams {
    pathToRevalidate: string
}