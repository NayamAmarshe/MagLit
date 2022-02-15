import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";

const Form = ({
  locked,
  setLocked,
  password,
  setPassword,
  magnetLink,
  setMagnetLink,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-auto mb-auto flex h-full flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <input
          type="text"
          className="animate rounded-2xl border-2 border-slate-200 bg-slate-100 p-5 text-slate-500 outline-none hover:shadow-md hover:shadow-slate-200 focus:border-slate-100 focus:shadow-lg focus:shadow-slate-300"
          value={magnetLink}
          onChange={(e) => setMagnetLink(e.target.value)}
          placeholder="Enter your link"
        />
        {locked && (
          <button
            onClick={() => setLocked(!locked)}
            className="animate z-10 cursor-pointer text-3xl text-slate-400 hover:scale-110"
          >
            <BsFillLockFill />
          </button>
        )}
        {!locked && (
          <button
            onClick={() => setLocked(!locked)}
            className="animate z-10 cursor-pointer text-3xl text-slate-400 hover:scale-110"
          >
            <BsFillUnlockFill />
          </button>
        )}
        <div
          className={
            !locked
              ? "animate h-0 -translate-y-7 opacity-0"
              : "animate h-20 translate-y-0 opacity-100"
          }
        >
          <input
            type="text"
            className="animate rounded-2xl border-2 border-orange-200 bg-orange-100 p-5 text-orange-500 outline-none hover:shadow-md hover:shadow-orange-200 focus:border-orange-100 focus:shadow-lg focus:shadow-orange-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={!locked}
          />
        </div>
      </div>
      <input
        type="submit"
        className="animate z-10 mt-5 rounded-2xl bg-slate-200 p-5 text-slate-500 hover:cursor-pointer hover:bg-cyan-200 hover:text-cyan-700 hover:shadow-lg hover:shadow-cyan-300 focus:bg-cyan-200 focus:text-cyan-700 focus:shadow-lg focus:shadow-cyan-300"
        value="Light It Up 🔥"
      />
    </form>
  );
};

export default Form;
