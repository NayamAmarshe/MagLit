const Form = ({ password, setPassword, handleSubmit }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-auto mb-auto flex flex-col items-center justify-center md:h-full"
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="animate text-slate-300 hover:text-slate-500">
          This maglit link is password protected
        </p>
        <input
          type="text"
          className="animate rounded-2xl border-2 border-orange-200 bg-orange-100 p-5 text-orange-500 outline-none hover:shadow-md hover:shadow-orange-200 focus:border-orange-100 focus:shadow-lg focus:shadow-orange-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <input
        type="submit"
        className="animate z-10 mt-5 rounded-2xl bg-slate-200 p-5 text-slate-500 hover:cursor-pointer hover:bg-cyan-200 hover:text-cyan-700 hover:shadow-lg hover:shadow-cyan-300 focus:bg-cyan-200 focus:text-cyan-700 focus:shadow-lg focus:shadow-cyan-300"
        value="Unlock 🔓"
      />
    </form>
  );
};

export default Form;
