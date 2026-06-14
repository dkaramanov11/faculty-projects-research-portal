<?php

namespace App\Enums;

enum ProjectApprovalStatus: string
{
    case PENDING = 'pending';

    case APPROVED = 'approved';

    case REJECTED = 'rejected';
}
