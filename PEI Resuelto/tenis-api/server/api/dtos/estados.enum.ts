export enum Estados {
    EnCurso = 'EN CURSO',
    NoIniciado = 'NO INICIADO',
    Finalizado = 'FINALIZADO'
}

export const checkState = (state) => {
    switch (state) {
        case Estados.EnCurso:
            return true;
        case Estados.NoIniciado:
            return true;
        case Estados.Finalizado:
            return true;
        default:
            return false;
    }
}

