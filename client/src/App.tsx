function App() {
  return (
    <div>
      <div className="w-full bg-[#CD9FCC] h-[91px] flex items-center justify-between">
        <div className="flex gap-1 items-center h-full px-5">
          <button className="mx-3 cursor-pointer">
            <img src="/menu_icon.svg" alt="menu" height={36} width={36} />
          </button>
          <div className="flex gap-1 items-center cursor-pointer">
            <img
              src="/dado_hub_logo.png"
              alt="dado-logo"
              height={78}
              width={68}
            />
            <div className="text-[32px] font-medium">Dado Hub</div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-5">
          <button className="cursor-pointer">
            <img src="/notification_icon.svg" alt="notification" height={36} width={36} />
          </button>
          <div className="rounded-full cursor-pointer h-[46px] w-[46px] bg-black">

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
