module.exports = {
    globals: {
	"ts-jest": {
	    isolatedModules: true,
	}
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    }
};
