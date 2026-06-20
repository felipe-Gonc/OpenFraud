type Auth = {
  input: string;
  placeHolder: string;
  icon?: string;
  value: string;
  type: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputPerso =  ({ input, placeHolder, icon, type, value, onChange }: Auth) => {
  return (
    <div className="">
      <label className="bebas-neue-regular text-lg">{input}</label>

      <input placeholder={placeHolder} value={value} onChange={onChange} type={type} className="w-full py-3 px-5 border-2 text-neutral-600 border-neutral-200 rounded-xl outline-none focus:border-black transition-colors duration-300"/>

      {icon && <img src={icon} alt={input} />}
    </div>
  )
}

export default InputPerso
