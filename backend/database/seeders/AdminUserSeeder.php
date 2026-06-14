<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'System',
                'surname' => 'Admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('admin'),
                'role' => UserRole::ADMIN,
            ]
        );
    }
}
