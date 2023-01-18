interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  icon: JSX.Element;
  value?: string
  type?: string
  required?: boolean  
}

export const FormInput = (props: InputProps) => {
  return (
    <div className="flex items-center gap-4 rounded-md border border-slate-100 p-2 shadow-md">
      {props.icon}
      <input {...props} className="flex-grow outline-none" />
    </div>
  );
};
