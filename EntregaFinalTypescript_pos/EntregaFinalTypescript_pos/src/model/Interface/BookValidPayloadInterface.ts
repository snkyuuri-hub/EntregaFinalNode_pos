interface BookValidPayloadInterface {
  title: string;
  author: string;
  year?: number;
  isbn?: string;
  publisherId?: number;
}

export default BookValidPayloadInterface;