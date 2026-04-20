import Header from '../components/layout/Header';

function HomePage() {
   const isAuthenticated = false;

   const handleLagout = () => {
      console.log('logout');
   };

   return (
    <>
        <Header isAuthenticated={isAuthenticated} onLogout={handleLagout} />
        <main>Home Page content</main>
        </>
   );
}

export default HomePage