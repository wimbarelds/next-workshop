import { useState, FormEvent, useEffect } from 'react';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    document.title = `Pentastic! - Contact`;
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (status !== 'idle') return;
    // This function will be called when the user submits the form
    // It will send the data to the API
    setStatus('sending');
    setErrors([]);
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
          setStatus('sent');
        } else {
          // The request failed
          // Set the error message
          setStatus('idle');
          setErrors(data.errors);
        }
      })
      .catch((ex) => {
        // An error occurred
        // Set the error message
        setStatus('idle');
        if (ex && 'errors' in ex && Array.isArray(ex.errors)) {
          setErrors(ex.errors);
        } else if (ex && 'message' in ex) {
          setErrors([ex.message]);
        } else {
          setErrors(['An unknown error occured']);
        }
      });
  };

  if (status === 'sent') {
    return (
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <div className="rounded-lg bg-green-700 my-4 px-4 py-2">
          <p className="text-green-50">Your e-mail has been sent</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        {errors.length > 0 && (
          <ul className="rounded-lg bg-red-700 my-4 px-4 py-2 list-disc">
            {errors.map((error, index) => (
              <li className="text-red-50 ms-4" key={`${index}-${error}`}>
                {error}
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
          {status === 'sending' && (
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="flex flex-col justify-center items-center gap-4 px-8 py-4 bg-gray-500 rounded-xl animate-fade">
                <p className="text-white font-bold">Loading...</p>
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-solid border-gray-600 border-t-white"></div>
              </div>
            </div>
          )}
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              disabled={status !== 'idle'}
              className="mt-1 p-2 w-full border rounded-md text-black disabled:bg-gray-200 disabled:text-gray-700"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              disabled={status !== 'idle'}
              className="mt-1 p-2 w-full border rounded-md text-black disabled:bg-gray-200 disabled:text-gray-700"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              rows={10}
              disabled={status !== 'idle'}
              className="mt-1 p-2 w-full border rounded-md text-black disabled:bg-gray-200 disabled:text-gray-700"
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={status !== 'idle'}
            className="w-full bg-gradient-to-br from-blue-600 to-purple-700 block p-1 rounded-xl group"
          >
            <div className="px-8 py-2 rounded-lg text-3xl font-bold overflow-hidden relative isolate bg-gradient-to-br from-blue-900 to-purple-950">
              <div className="bg-gray-900 absolute inset-0 -z-10 transition-all group-hover:opacity-50 group-hover:translate-y-full"></div>
              Send
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
