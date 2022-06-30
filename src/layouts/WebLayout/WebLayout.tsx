import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function WebLayout() {
  return (
    <div className="mx-auto font-OpenSans">
      <Header />
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default WebLayout;
