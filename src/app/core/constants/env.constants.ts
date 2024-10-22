import { environment } from "../../../environments/environment";

/* Archivo con variables que invocan los distintos key-values del env */

//Api que vamos a utilizar para los posts
export const API_BASE = environment.api

//Api que vamos a utilizar para la autenticacion
export const AUTH_BASE = environment.authApi

//Variable que contiene el hash con el que vamos a cifrar la data del local storage
export const HASH_ENCRYPT = environment.hash_encrypt

//Variable con el ambiente por si necesitamos trabajar en UAT, QA, DEV, etc
export const ENV = environment.env

//Variable que vamos a utilizar para identificar los objetos almacenados en local storage
export const localStorageDS = `principal.ds`