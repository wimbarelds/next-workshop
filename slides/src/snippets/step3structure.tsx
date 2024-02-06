// @ts-nocheck

// This would not be allowed
function SomeClientComponent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>{count} times clicked</button>
      <SomeServerComponent />
    </div>
  );
}

// But this would be allowed
function SomeServerComponent() {
  return (
    <SomeClientComponent>
      <MyServerComponent />
    </SomeClientComponent>
  );
}

// This would also be allowed
function SomeServerComponent() {
  return (
    <ClientContextProvider>
      <SomeServerComponent>
        <SomeClientComponentUsingThatContext />
      </SomeServerComponent>
    </ClientContextProvider>
  );
}
