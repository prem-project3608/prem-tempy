import {MergeExclusive} from 'type-fest';

declare namespace tempy {
	type Options = MergeExclusive<
		{
			/**
			_You usually won't need this option. Specify it only when actually needed._

			File extension. Mutually exclusive with the `name` option.
			*/
			readonly extension?: string;
		},
		{
			/**
			_You usually won't need this option. Specify it only when actually needed._

			Filename. Mutually exclusive with the `extension` option.
			*/
			readonly name?: string;
		}
	>;
}

declare const tempy: {
	/**
	Get a temporary file path you can write to.

	@example
	```
	import tempy = require('tempy');
	import pathExists = require('path-exists');

	tempy.file();
	//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/4f504b9edb5ba0e89451617bf9f971dd'

	tempy.file({extension: 'png'});
	//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/a9fb0decd08179eb6cf4691568aa2018.png'

	tempy.file({name: 'unicorn.png'});
	//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/f7f62bfd4e2a05f1589947647ed3f9ec/unicorn.png'

	tempy.directory();
	//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/2f3d094aec2cb1b93bb0f4cffce5ebd6'

	tempy.clean();
	//=> ['/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/4f504b9edb5ba0e89451617bf9f971dd', ...]

	(async () => {
		console.log(await tempy.job(directory => pathExists(directory)));
		//=> true
	})();
	```
	*/
	file(options?: tempy.Options): string;

	/**
	Get a temporary directory path. The directory is created for you.

	@example
	```
	import tempy = require('tempy');

	tempy.directory();
	//=> '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T/2f3d094aec2cb1b93bb0f4cffce5ebd6'
	```
	*/
	directory(): string;

	/**
	Deletes temporary directories and returns an array of deleted path.

	@returns An array of deleted paths.
	*/
	clean(): string[];

	/**
	Returns a `Promise` for value obtained in `task`.

	@returns Task output
	@param task - A function that will be called with a temporary directory path. The directory is created and deleted when `Promise` is resolved.
	*/
	job(task: (directory: string) => unknown): Promise<unknown>;

	/**
	Get the root temporary directory path. For example: `/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T`.
	*/
	readonly root: string;
};

export = tempy;