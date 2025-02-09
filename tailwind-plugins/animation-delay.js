import plugin from "tailwindcss/plugin";

const animationDelay = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      "animation-delay": (value) => {
        return {
          "animation-delay": value,
        };
      },
    },
    {
      // We want the same preset as transitionDelay
      values: theme("transitionDelay"),
    }
  );
});

export default animationDelay;
