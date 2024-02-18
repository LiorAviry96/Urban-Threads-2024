import classes from "./Button.css";

export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className={classes.button + props.className ? " " + props.className : ""}
    >
      {children}
    </button>
  );
}
