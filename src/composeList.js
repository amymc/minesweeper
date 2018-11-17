export default ({ reset, switchLevel, toggleItem }) => {
  return [
    {
      title: "New",
      hasBottomBorder: true,
      onClick: e => {
        reset()
        toggleItem(e)
      }
    },
    {
      title: "Beginner",
      hasTopBorder: true,
      onClick: e => {
        switchLevel("beginner")
        toggleItem(e)
      }
    },
    {
      title: "Intermediate",
      onClick: e => {
        switchLevel("intermediate")
        toggleItem(e)
      }
    },
    {
      title: "Expert",
      hasBottomBorder: true,
      onClick: e => {
        switchLevel("expert")
        toggleItem(e)
      }
    },
    {
      title: "About",
      hasTopBorder: true,
      hasBottomBorder: true,
      onClick: toggleItem,
      name: "showAbout"
    },
    {
      title: "Best Times...",
      hasTopBorder: true,
      hasBottomBorder: true,
      onClick: toggleItem,
      name: "showTimes"
    },
    {
      title: "Exit",
      hasTopBorder: true,
      onClick: toggleItem,
      name: "showScreensaver"
    }
  ]
}
