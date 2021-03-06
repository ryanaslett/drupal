<?php

/**
 * @file
 * Contains \Drupal\comment\CommentAccessControlHandler.
 */

namespace Drupal\comment;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;

/**
 * Defines the access control handler for the comment entity type.
 *
 * @see \Drupal\comment\Entity\Comment
 */
class CommentAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, $langcode, AccountInterface $account) {
    /** @var \Drupal\Core\Entity\EntityInterface|\Drupal\user\EntityOwnerInterface $entity */
    switch ($operation) {
      case 'view':
        if ($account->hasPermission('access comments') && $entity->isPublished() || $account->hasPermission('administer comments')) {
          return $entity->getCommentedEntity()->access($operation, $account);
        }
        break;

      case 'update':
        return ($account->id() && $account->id() == $entity->getOwnerId() && $entity->isPublished() && $account->hasPermission('edit own comments')) || $account->hasPermission('administer comments');
        break;

      case 'delete':
        return $account->hasPermission('administer comments');
        break;

      case 'approve':
        return $account->hasPermission('administer comments');
        break;
    }
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return $account->hasPermission('post comments');
  }

}
