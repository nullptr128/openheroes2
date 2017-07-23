/**
 * OpenHeroes2
 * 
 * This file describes Provider function for
 * service container. You can create a function
 * that accepts container as argument and binds
 * various services into container.
 * 
 * For example Engine has its own provider, which
 * registers classes responsible for AGG extracting,
 * TIL/ICN loading, creating WAV files from .82M files
 * etc.
 */

import Container from './Container';

type IProvider = ( container: Container ) => void;

export default IProvider;
