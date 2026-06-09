<?php

namespace App\Enums;

enum ProjectRequestType: string
{
    case PARTICIPATION = 'participation_request';
    case MENTOR = 'mentor_request';
}
