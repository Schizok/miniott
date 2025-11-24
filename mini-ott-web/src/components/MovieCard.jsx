import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/watch/${movie.id}`} className="card bg-base-100 shadow-xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <figure className="aspect-video relative">
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary text-primary-content rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75">
                        <Play className="w-6 h-6 fill-current" />
                    </div>
                </div>
            </figure>
            <div className="card-body p-4 gap-1">
                <h2 className="card-title text-base line-clamp-1">{movie.title}</h2>
                <div className="flex gap-2 mt-2">
                    {movie.tags.map(tag => (
                        <div key={tag} className="badge badge-xs badge-outline opacity-70">{tag}</div>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
