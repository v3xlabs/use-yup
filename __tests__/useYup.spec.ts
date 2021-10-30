import { useYup } from '../lib';
import * as yup from 'yup';

it('Performs basic test', () => {
    expect(useYup(yup.object({
        name: yup.string().length(5),
        age: yup.number().positive()
    })));
});