import { useState, FormEvent } from 'react';

export function CommentField({ posturl, onSent }: { posturl: string; onSent?: () => void }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // This function will be called when the user submits the form
    // It will send the data to the API
    setIsSubmitting(true);
    fetch(posturl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        comment,
      }),
    })
      .then(() => {
        // The request was successful
        // Clear the form fields
        setName('');
        setComment('');
        onSent?.();
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 lg:prose-lg flex flex-col items-end">
      <div className="w-full">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          required
          disabled={isSubmitting}
          className="mt-1 p-1 w-full border rounded-md bg-gray-700 text-white"
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="w-full">
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          rows={3}
          required
          disabled={isSubmitting}
          className="mt-1 p-1 w-full border rounded-md bg-gray-700 text-white"
          onChange={(event) => setComment(event.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-gradient-to-br from-blue-600 to-purple-700 block p-1 rounded-xl group"
      >
        <div className="px-6 py-1 rounded-lg text-xl font-bold overflow-hidden relative isolate bg-gradient-to-br from-blue-900 to-purple-950">
          <div className="bg-gray-900 absolute inset-0 -z-10 transition-all group-hover:opacity-50 group-hover:translate-y-full"></div>
          Submit comment
        </div>
      </button>
    </form>
  );
}
