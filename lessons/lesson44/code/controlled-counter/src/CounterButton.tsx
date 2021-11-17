export function CounterButton({
  value,
  inc,
  dec,
}: {
  value: number;
  inc: () => void;
  dec: () => void;
}) {
  return (
    <>
      <button onClick={dec}>-</button>
      {value}
      <button onClick={inc}>+</button>
    </>
  );
}
