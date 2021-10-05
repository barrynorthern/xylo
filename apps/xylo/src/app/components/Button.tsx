interface IButtonProps {
  text: string;
  onPress: () => void;
}

export function Button({ text, onPress }: IButtonProps) {
  return (
    <div
      className="text-center bg-gradient-to-r from-duckegg to-lightblue hover:text-white hover:shadow-md rounded-md cursor-pointer h-6 py-1 px-3 text-xs font-bold text-black uppercase"
      onClick={(e) => onPress()}
    >
      {text}
    </div>
  );
}
