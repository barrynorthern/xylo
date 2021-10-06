import logo from './img/logo.png';

export function Header() {
  return (
    <div className="bg-blue py-8 w-screen">
      <div className="flex justify-between mx-auto md:w-10/12 lg:w-3/4 xl:w-1/2 w-full flex-1 px-8">
        <img src={logo} alt="logo" className="w-11 h-16 mr-12"/>
        <div className="flex flex-col">
            <label className="text-xl md:text-2xl lg:text-4xl font-bold text-right">
                <span className="bg-gradient-to-r from-duckegg to-lightblue text-transparent bg-clip-text">All in one</span> <span className="text-white">mental health support.</span>
            </label>
            <label className="text-sm text-white text-right">
                Spill provides therapy sessions, manager mental health training, and regular feelings check-ins
            </label>
        </div>
      </div>
    </div>
  );
}
