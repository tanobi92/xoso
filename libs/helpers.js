module.exports = {
    promisify: (inner) => {
        return new Promise((resolve, reject) =>
            inner((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        );
    }
};