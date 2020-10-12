import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../interfaces/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  @Input('player') item: Player;
  image = 'https://php.localidautore.it/soccer/images/team/';

  constructor() { }

  ngOnInit() {}

}
