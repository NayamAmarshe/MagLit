import { useState } from "react";
import {
  BsFillEyeFill,
  BsFillEyeSlashFill,
  BsFillGearFill,
  BsFillLockFill,
  BsFillUnlockFill,
} from "react-icons/bs";

const Form = ({
  locked,
  setLocked,
  password,
  setPassword,
  magnetLink,
  setMagnetLink,
  handleSubmit,
  setLinkSettingsOpen,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col items-center justify-center"
    >
      <div className="flex w-full flex-col items-center justify-center gap-y-4">
        {/* LINK INPUT */}
        <input
          type="text"
          className="text-input max-w-80"
          value={magnetLink}
          onChange={(e) => setMagnetLink(e.target.value)}
          placeholder="Enter your link"
          id="no-swipe"
        />

        {/* LOCK & CONFIG BUTTONS */}
        <div className="flex flex-row items-center justify-center space-x-4">
          {locked ? (
            <button
              type="button"
              onClick={() => setLocked(!locked)}
              className="animate z-10 cursor-pointer text-3xl text-slate-400 hover:scale-110 dark:text-stone-400"
            >
              <BsFillLockFill />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setLocked(!locked)}
              className="animate z-10 cursor-pointer text-3xl text-slate-400 hover:scale-110 dark:text-stone-400"
            >
              <BsFillUnlockFill />
            </button>
          )}

          {/* LINK SETTINGS BUTTON */}
          <button
            type="button"
            className="animate z-10 cursor-pointer object-cover text-3xl text-slate-400 hover:rotate-45 dark:text-stone-400"
            onClick={() => setLinkSettingsOpen(true)}
          >
            <BsFillGearFill />
          </button>
        </div>

        {/* PASSWORD INPUT */}
        <div
          className={`${
            !locked
              ? "animate h-0 -translate-y-7 opacity-0"
              : "animate h-20 translate-y-0 opacity-100"
          } relative flex w-full max-w-80 items-center justify-center`}
        >
          <input
            type={showPassword ? "text" : "password"}
            className="password-input relative"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={!locked}
            id="no-swipe"
          />
          {showPassword ? (
            <BsFillEyeFill
              className="absolute right-6 cursor-pointer text-xl text-orange-500 dark:text-orange-400 xs:right-3"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />
          ) : (
            <BsFillEyeSlashFill
              className="absolute right-6 cursor-pointer text-xl text-orange-500 dark:text-orange-400 xs:right-3"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />
          )}
        </div>
      </div>

      {/* LIGHT IT UP BUTTON */}
      <input type="submit" className="submit-button" value="Light It Up 🔥" />
    </form>
  );
};

export default Form;
