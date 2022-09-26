<?php

return [
    /**
     * Control if the seeder should create a user per role while seeding the data.
     */
    'create_users' => true,

    /**
     * Control if all the laratrust tables should be truncated before running the seeder.
     */
    'truncate_tables' => true,

    'roles_structure' => [
        'admin' => [
            'users' => 'c,r,u,d',
            'roles' => 'c,r,u,d',
            'faculties' => 'c,r,u,d',
            'courses' => 'c,r,u,d',
            'units' => 'c,r,u,d',
        ],
        'lec' => [
            'past_papers' => 'c,r,u,d',
        ],
        'student' => [
            'past_papers' => 'r',
        ],
    ],

    'permissions_map' => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete'
    ]
];
