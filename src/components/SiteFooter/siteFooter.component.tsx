const SiteFooter = () => {
  return (
    <footer>
      <div className="footer-container">
        &copy; theScore {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default SiteFooter;
