// import  { useEffect, useState } from "react";

// const ResponsiveComponent = () => {
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   // Przykładowe warunki dla różnych rozmiarów ekranu
//   let componentToRender = null;

//   if (windowSize.width >= 1920) {
//     componentToRender = <div>Komponent dla rozmiaru PC (min. 1920px)</div>;
//   } else if (windowSize.width >= 1024) {
//     componentToRender = <div>Komponent dla rozmiaru laptopa (min. 1024px)</div>;
//   } else if (windowSize.width >= 768) {
//     componentToRender = <div>Komponent dla rozmiaru tabletu (min. 768px)</div>;
//   } else {
//     componentToRender = <div>Komponent dla rozmiaru mobile (min. 320px)</div>;
//   }

//   return (
//     <div>
//       <h1>Responsive Component</h1>
//       {componentToRender}
//     </div>
//   );
// };

// export default ResponsiveComponent;
