'use strict';

interface models {
    [key: string]: any
}

const m: models = {
        project: {
            path: "./models/project",
            methods: [
                {
                    name: "list"
                },
                {
                    name: "hello"
                }
            ]
        }

}

export default m;