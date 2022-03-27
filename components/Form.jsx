import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { RiPencilFill } from "react-icons/ri";
const Form = ({
  locked,
  setLocked,
  password,
  setPassword,
  magnetLink,
  setMagnetLink,
  handleSubmit,
  showEditSlug,
  setShowEditSlug,
  slug,
  setSlug,
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

        <div className="flex justify-center items-center gap-2">
          {/* LOCK BUTTON */}
          {locked ? (
            <button
              type="button"
              onClick={() => setLocked(!locked)}
              className="animate z-10 cursor-pointer text-3xl text-slate-400 hover:scale-110"
            >
              <BsFillLockFill className="text-red-400" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setLocked(!locked)}
              className="animate z-10 cursor-pointer text-3xl text-slate-400 hover:scale-110"
            >
              <BsFillUnlockFill />
            </button>
          )}

          {/* EDIT SLUG BUTTON */}
          {/* {showEditSlug ? (
            <button
              type="button"
              onClick={() => setShowEditSlug(false)}
              className="animate z-10 cursor-pointer text-3xl text-slate-400 hover:scale-110"
            >
              <RiPencilFill className="animate text-blue-400 -rotate-45" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowEditSlug(true)}
              className="animate z-10 cursor-pointer text-3xl text-slate-400 hover:scale-110"
            >
              <RiPencilFill className="animate" />
            </button>
          )} */}
        </div>

        {/* PASSWORD AND SLUG INPUT */}
        <div>
          {/* SLUG INPUT */}
          {/* <div
            className={`${
              !showEditSlug
                ? "animate h-0 -translate-y-7 opacity-0"
                : "animate h-20 translate-y-0 opacity-100"
            } flex items-center justify-center`}
          >
            <input
              id="slug"
              type="text"
              className="text-input"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Custom MagLit Link"
              disabled={!showEditSlug}
            />
          </div> */}

          {/* PASSWORD INPUT */}
          <div
            className={`${
              locked &&
              !showEditSlug &&
              "animate h-20 translate-y-0 opacity-100"
            } ${
              locked && showEditSlug && "animate h-20 translate-y-0 opacity-100"
            } ${
              !locked && !showEditSlug && "animate h-0 -translate-y-7 opacity-0"
            } ${
              !locked && showEditSlug && "animate h-0 translate-y-7 opacity-0"
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
      </div>

      {/* LIGHT IT UP BUTTON */}
      <input
        type="submit"
        className="submit-button z-10"
        value="Light It Up 🔥"
      />
    </form>
  );
};

export default Form;
