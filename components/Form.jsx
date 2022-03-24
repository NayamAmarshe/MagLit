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
      className="flex h-full flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center gap-y-4">
        {/* LINK INPUT */}
        <input
          type="text"
          className="text-input"
          value={magnetLink}
          onChange={(e) => setMagnetLink(e.target.value)}
          placeholder="Enter your link"
        />

        {/* LOCK BUTTON */}
        {locked ? (
          <button
            onClick={() => setLocked(!locked)}
            className="animate z-10 cursor-pointer text-3xl text-slate-400 hover:scale-110"
          >
            <BsFillLockFill />
          </button>
        ) : (
          <button
            onClick={() => setLocked(!locked)}
            className="animate z-10 cursor-pointer text-3xl text-slate-400 hover:scale-110"
          >
            <BsFillUnlockFill />
          </button>
        )}

        {/* PASSWORD INPUT */}
        <div
          className={`${
            !locked
              ? "animate h-0 -translate-y-7 opacity-0"
              : "animate h-20 translate-y-0 opacity-100"
          } flex items-center justify-center`}
        >
          <input
            type="text"
            className="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={!locked}
          />
        </div>
      </div>

      {/* LIGHT IT UP BUTTON */}
      <input type="submit" className="submit-button" value="Light It Up 🔥" />
    </form>
  );
};

export default Form;
