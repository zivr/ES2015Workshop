const fakeAjax = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            switch (url) {
                case 'http://some.init.data/':
                    resolve({ id: 0, msg: 'working' });
                    break;
                case 'http://extra.information/':
                    resolve({ foo: 'still working' });
                    break;
                case 'http://some.unknown.data/':
                    reject({ id: null, msg: 'not found' });
                    break;
                default:
                    throw 'no such url';
            }
        }, 1000);
    });
};

const fetch_data = ()=> {
    return fakeAjax('http://some.init.data/')
};
const fetchExtraData = (data)=> {
    return fakeAjax('http://extra.information/').then(val => Object.assign(val, data));
};


fetch_data()
    .then(data => {
        data.info = 'test';
        return data;
    })
    .then(data => {
        console.log('second then. data = ' , data);
        return fetchExtraData(data);
    })
    .then(data => {
        console.log('last then. data = ' , data);
        console.log(data);
    });

