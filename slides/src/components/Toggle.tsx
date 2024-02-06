interface ToggleProps {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export function Toggle({ value, setValue, className }: ToggleProps) {
  function preventClickLeak(e: React.MouseEvent) {
    e.stopPropagation();
  }
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.checked);
  }
  return (
    <div className={className ?? ''}>
      <label
        className={`cursor-pointer p-4`}
        onClick={preventClickLeak}
        onContextMenu={preventClickLeak}
      >
        <div className="relative inline-flex items-center">
          <input type="checkbox" className="sr-only peer" checked={value} onChange={onChange} />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Enable Navigation
          </span>
        </div>
      </label>
    </div>
  );
}
