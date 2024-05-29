import { Button } from '@nextui-org/react';

interface NavBarProps {
  currentComponent: string;
  setCurrentComponent: (component: string) => void;
}

export default function NavBar({ currentComponent, setCurrentComponent }: NavBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-40 p-2 flex justify-around">
      <Button variant="light" onClick={() => setCurrentComponent('home')}>
        Home
      </Button>
      <Button variant="light" onClick={() => setCurrentComponent('bankConnection')}>
        Bank
      </Button>
      {/* Add more buttons for other components here */}
    </div>
  );
}

// export default function NavBar({ currentComponent, setCurrentComponent }: NavBarProps) {
//     return (
//         // <div className="fixed bottom-0 left-0 right-0 bg-white p-2 flex justify-around border-t border-gray-200">
//         <Navbar position="static">
//             <NavbarContent className="hidden sm:flex gap-4" justify="center">
//                 <Button variant="light" onClick={() => setCurrentComponent('home')}>
//                     Home
//                 </Button>
//             </NavbarContent>
//             <NavbarContent justify="end">
//                 <Button variant="light" onClick={() => setCurrentComponent('bankConnection')}>
//                     Bank
//                 </Button>
//             </NavbarContent>
//             {/* Add more buttons for other components here */ }
//         </Navbar >
//     );
// }