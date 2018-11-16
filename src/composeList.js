export default ({ reset, switchLevel, toggleItem }) => {
  return [
    {
      title: "New",
      onClick: e => {
        reset()
        toggleItem(e)
      }
    },
    {
      title: "Beginner",
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
      onClick: e => {
        switchLevel("expert")
        toggleItem(e)
      }
    },
    {
      title: "Best Times...",
      onClick: toggleItem,
      name: "showTimes"
    },
    {
      title: "Exit",
      onClick: toggleItem,
      name: "showScreensaver"
    }
  ]
}
