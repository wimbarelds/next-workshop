import { useState, FormEvent } from 'react';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // This function will be called when the user submits the form
    // It will send the data to the API
    setIsSubmitting(true);
    setErrorMessage('');
    fetch('http://localhost:1234/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // The request was successful
          // Clear the form fields
          setName('');
          setEmail('');
          setMessage('');
        } else {
          // The request failed
          // Set the error message
          setErrorMessage(data.message);
        }
      })
      .catch((error) => {
        // An error occurred
        // Set the error message
        setErrorMessage(error.message);
      })
      .finally(() => {
        // The request is complete
        // Set the isSubmitting state to false
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              rows={10}
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-br from-blue-600 to-purple-700 block p-1 rounded-xl group"
          >
            <div className="px-8 py-2 rounded-lg text-3xl font-bold overflow-hidden relative isolate bg-gradient-to-br from-blue-900 to-purple-950">
              <div className="bg-gray-900 absolute inset-0 -z-10 transition-all group-hover:opacity-50 group-hover:translate-y-full"></div>
              Send
            </div>
          </button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
}
