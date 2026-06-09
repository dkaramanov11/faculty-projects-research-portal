<?php

namespace App\Enums;

enum ProjectRequestStatus: string
{
    case PENDING = 'pending';
    case ACCEPTED = 'accepted';
    case REJECTED = 'rejected';
}
