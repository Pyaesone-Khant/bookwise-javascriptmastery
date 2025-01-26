interface Book {
    title: string;
    author: string;
    id: number;
    genre: string;
    rating: number;
    totalCopies: number;
    availableCopies: number;
    description: string;
    color: string;
    coverUrl: string;
    video: string;
    summary: string;
    isLoanedBook?: boolean;
}