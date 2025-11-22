import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { newProduct } from '../../Service/AutenticationService';
import React from 'react';

export default function Modal(isOpen){
  if(isOpen){
    return <div>modal</div>
  }
    return null;
}