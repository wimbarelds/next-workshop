export function Slide2() {
  return (
    <div className="flex flex-col gap-8 text-4xl">
      <p className="mb-12 text-5xl font-bold text-center">Before we continue</p>

      <p className="font-bold -mb-4">Step 1:</p>
      <pre className="bg-slate-900 px-4 py-2 rounded-lg">git clone https://github.com/wimbarelds/next-workshop.git</pre>

      <p className="font-bold -mb-4">Step 2:</p>
      <div className="flex gap-4 items-center">
        <pre className="bg-slate-900 px-4 py-2 rounded-lg">npm install</pre>
        Or
        <pre className="bg-slate-900 px-4 py-2 rounded-lg">npm ci</pre>
      </div>
    </div>
  );
}