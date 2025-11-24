import React from 'react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/movies';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const featuredMovie = movies[0]; // Sintel

    return (
        <div className="min-h-screen bg-base-300 pb-20">
            <Navbar />

            {/* Hero Section */}
            <div className="hero min-h-[80vh] relative">
                <div className="absolute inset-0">
                    <img src={featuredMovie.poster} className="w-full h-full object-cover opacity-50" alt="Hero Background" />
                    <div className="absolute inset-0 bg-gradient-to-t from-base-300 via-base-300/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-base-300 via-base-300/20 to-transparent"></div>
                </div>

                <div className="hero-content text-left text-neutral-content relative z-10 w-full justify-start px-4 md:px-12 mt-20">
                    <div className="max-w-2xl">
                        <h1 className="mb-5 text-5xl md:text-7xl font-bold text-white drop-shadow-xl">{featuredMovie.title}</h1>
                        <p className="mb-8 text-lg md:text-xl text-gray-200 drop-shadow-md max-w-lg">{featuredMovie.description}</p>
                        <div className="flex gap-4">
                            <Link to={`/watch/${featuredMovie.id}`} className="btn btn-primary btn-lg gap-2 px-8">
                                <Play className="w-6 h-6 fill-current" /> Watch Now
                            </Link>
                            <button className="btn btn-ghost btn-lg gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm">
                                <Info className="w-6 h-6" /> More Info
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 md:px-12 -mt-20 relative z-20">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                    <span className="w-1 h-8 bg-primary rounded-full"></span>
                    Trending Now
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
