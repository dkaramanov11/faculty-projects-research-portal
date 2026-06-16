<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('project_requests', function (Blueprint $table) {
            $table->boolean('deleted_by_sender')->default(false);
            $table->boolean('deleted_by_receiver')->default(false);
        });

        Schema::table('project_creation_requests', function (Blueprint $table) {
            $table->boolean('deleted_by_user')->default(false);
        });

        Schema::table('professor_role_requests', function (Blueprint $table) {
            $table->boolean('deleted_by_user')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_requests', function (Blueprint $table) {
            $table->dropColumn(['deleted_by_sender', 'deleted_by_receiver']);
        });

        Schema::table('project_creation_requests', function (Blueprint $table) {
            $table->dropColumn('deleted_by_user');
        });

        Schema::table('professor_role_requests', function (Blueprint $table) {
            $table->dropColumn('deleted_by_user');
        });
    }
};
