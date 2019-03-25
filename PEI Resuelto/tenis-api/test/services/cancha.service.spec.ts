import CanchaService from '../../server/api/services/cancha.service';
import * as typeorm from "typeorm";
import { CanchaRepository } from '../../server/api/repositories/cancha.repository';
import { Cancha } from '../../server/api/model/cancha';

describe('CanchaService Tests', () => {

    let customRepositorySpy;
    let canchaRepositorySpy;

    beforeEach(() => {
        canchaRepositorySpy = {} as CanchaRepository;
        customRepositorySpy = spyOn(typeorm, 'getCustomRepository').and.returnValue(canchaRepositorySpy);
    });

    it('should save Cancha', () => {
        let cancha = { id: 5, nombre: 'cancha', direccion: 'dirección' } as Cancha;

        canchaRepositorySpy.save = jasmine.createSpy('save').and.callFake((j) => Promise.resolve(j));

        CanchaService.save(cancha).then(j => {
            expect(j).toBe(cancha);

            expect(customRepositorySpy).toHaveBeenCalledTimes(1);

            expect(canchaRepositorySpy.save).toHaveBeenCalledTimes(1);
            expect(canchaRepositorySpy.save).toHaveBeenCalledWith(cancha);
        });
    });

    it('should update Cancha', () => {
        let cancha = { id: 5, nombre: 'cancha', direccion: 'dirección' } as Cancha;

        canchaRepositorySpy.update = jasmine.createSpy('update').and.callFake((id, j) => Promise.resolve(j));

        CanchaService.update(5, cancha).then(j => {
            expect(j).toBe(cancha);

            expect(customRepositorySpy).toHaveBeenCalledTimes(1);

            expect(canchaRepositorySpy.update).toHaveBeenCalledTimes(1);
            expect(canchaRepositorySpy.update).toHaveBeenCalledWith(5, cancha);
        });
    });

    it('should remove Cancha', () => {
        let cancha = { id: 5, nombre: 'cancha', direccion: 'dirección' } as Cancha;

        canchaRepositorySpy.remove = jasmine.createSpy('remove').and.returnValue(Promise.resolve(cancha));

        CanchaService.remove(5).then(j => {
            expect(j).toBe(cancha);

            expect(customRepositorySpy).toHaveBeenCalledTimes(1);

            expect(canchaRepositorySpy.remove).toHaveBeenCalledTimes(1);
            expect(canchaRepositorySpy.remove).toHaveBeenCalledWith(5);
        });
    });

    it('should find one Cancha', () => {
        let cancha = { id: 5, nombre: 'cancha', direccion: 'dirección' } as Cancha;
        canchaRepositorySpy.findOne = jasmine.createSpy('findOne').and.returnValue(Promise.resolve(cancha));

        CanchaService.findOne(5).then(j => {
            expect(j).toBe(cancha);

            expect(customRepositorySpy).toHaveBeenCalledTimes(1);

            expect(canchaRepositorySpy.findOne).toHaveBeenCalledTimes(1);
            expect(canchaRepositorySpy.findOne).toHaveBeenCalledWith(5);
        });
    });

    it('should get all Canchas', () => {
        let cancha = { id: 5, nombre: 'cancha', direccion: 'dirección' } as Cancha;
        let canchas = [cancha];

        canchaRepositorySpy.findAll = jasmine.createSpy('findAll').and.returnValue(Promise.resolve(canchas));

        CanchaService.getAll().then(j => {
            expect(j).toBe(canchas);

            expect(customRepositorySpy).toHaveBeenCalledTimes(1);

            expect(canchaRepositorySpy.findAll).toHaveBeenCalledTimes(1);
        });
    });
});