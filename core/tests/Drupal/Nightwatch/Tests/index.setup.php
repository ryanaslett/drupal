<?php

class IndexSetup implements \Drupal\Setup\TestSetupInterface {

  /**
   * {@inheritdoc}
   */
  public function setup() {
    \Drupal::service('module_installer')->install(['test_page_test']);
  }

}
